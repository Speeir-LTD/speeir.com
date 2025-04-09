// src/app/api/blog/route.ts
import { NextResponse } from 'next/server';
import { getDb } from '@/utils/dbConnect';
import { ObjectId } from 'mongodb';
import { 
  BlogPost, 
  ApiResponse, 
  BlogPostCreateDTO, 
  BlogPostUpdateDTO,
  BlogPostInsert
} from '@/types/post';
import { validateBlogPost } from '@/utils/validators/blog';

// Helper for error responses
const errorResponse = (message: string, status: number) => {
  return NextResponse.json({ success: false, error: message }, { status });
};

export async function GET(request: Request): Promise<NextResponse<ApiResponse<BlogPost[]>>> {
  try {
    const db = await getDb();
    const { searchParams } = new URL(request.url);
    
    // Pagination
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100); // Fixed missing closing parenthesis
    const page = parseInt(searchParams.get('page') || '1');
    
    // Optional filters
    const author = searchParams.get('author');
    const tag = searchParams.get('tag');
    
    const query: any = {};
    if (author) query.author = author;
    if (tag) query.tags = tag;
    
    const [posts, total] = await Promise.all([
      db.collection<BlogPost>('posts')
        .find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .toArray(),
      db.collection<BlogPost>('posts').countDocuments(query)
    ]);
    
    return NextResponse.json({
      success: true,
      data: posts.map(post => ({
        ...post,
        _id: post._id.toString()
      })),
      total,
      page,
      limit
    });
    
  } catch (error) {
    console.error('GET Error:', error);
    return errorResponse('Failed to fetch posts', 500);
  }
}

export async function POST(request: Request): Promise<NextResponse<ApiResponse<BlogPost>>> {
  try {
    const db = await getDb();
    const body: BlogPostCreateDTO = await request.json();
    
    // Validate input
    const validation = validateBlogPost(body);
    if (!validation.success) {
      return errorResponse(validation.error?.message ?? 'Validation failed', 400);
    }
    
    const newPost: BlogPostInsert = {
      ...body,
      tags: body.tags || [],
      views: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection<Omit<BlogPost, '_id'>>('posts').insertOne(newPost); // Use Omit<BlogPost, '_id'> for type compatibility
    const createdPost = await db.collection<BlogPost>('posts').findOne({
      _id: result.insertedId as any
    });
    
    if (!createdPost) {
      return errorResponse('Failed to retrieve created post', 500);
    }
    
    return NextResponse.json(
      { 
        success: true, 
        data: {
          ...createdPost,
          _id: createdPost._id.toString()
        } 
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('POST Error:', error);
    return errorResponse('Failed to create post', 500);
  }
}

export async function PUT(request: Request): Promise<NextResponse<ApiResponse<BlogPost>>> {
  try {
    const db = await getDb();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const body: BlogPostUpdateDTO = await request.json();
    
    if (!id || !ObjectId.isValid(id)) {
      return errorResponse('Valid post ID is required', 400);
    }
    
    // Validate input
    const validation = validateBlogPost(body, true);
    if (!validation.success) {
      return errorResponse(validation.error?.message ?? 'Validation failed', 400);
    }
    
    const updateData = {
      ...body,
      updatedAt: new Date()
    };
    
    const result = await db.collection<BlogPost>('posts').updateOne(
      { _id: new ObjectId(id) as any },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      return errorResponse('Post not found', 404);
    }
    
    const updatedPost = await db.collection<BlogPost>('posts').findOne({
      _id: new ObjectId(id) as any
    });
    
    if (!updatedPost) {
      return errorResponse('Failed to retrieve updated post', 500);
    }
    
    return NextResponse.json({
      success: true,
      data: {
        ...updatedPost,
        _id: updatedPost._id.toString()
      }
    });
    
  } catch (error) {
    console.error('PUT Error:', error);
    return errorResponse('Failed to update post', 500);
  }
}

export async function DELETE(request: Request): Promise<NextResponse<ApiResponse>> {
  try {
    const db = await getDb();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id || !ObjectId.isValid(id)) {
      return errorResponse('Valid post ID is required', 400);
    }
    
    const result = await db.collection<BlogPost>('posts').deleteOne({
      _id: new ObjectId(id) as any // Explicitly cast to resolve type mismatch
    });
    
    if (result.deletedCount === 0) {
      return errorResponse('Post not found', 404);
    }
    
    return NextResponse.json({
      success: true,
      data: { id }
    });
    
  } catch (error) {
    console.error('DELETE Error:', error);
    return errorResponse('Failed to delete post', 500);
  }
}