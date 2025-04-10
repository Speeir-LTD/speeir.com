import { NextResponse } from 'next/server';
import { getDb } from '@/utils/dbConnect';
import { ObjectId } from 'mongodb';
import { BlogPost, ApiResponse } from '@/types/post';

export const dynamic = 'force-dynamic'; // Add this line

const errorResponse = (message: string, status: number) => {
  return NextResponse.json({ success: false, error: message }, { status });
};

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    try {
      const db = await getDb();
      const { id } = await params; // Use params directly from the function argument
  
      // First try finding by string ID
      let post = await db.collection('posts').findOne({ _id: id as any });
  
      // If not found, try as ObjectId
      if (!post && ObjectId.isValid(id)) {
        post = await db.collection('posts').findOne({ 
          _id: new ObjectId(id) 
        });
      }
  
      if (!post) {
        return errorResponse('Post not found', 404);
      }
  
      // Increment views
      await db.collection('posts').updateOne(
        { _id: post._id },
        { $inc: { views: 1 } }
      );
  
      return NextResponse.json({
        success: true,
        data: {
          ...post,
          _id: post._id.toString() // Ensure consistent output format
        }
      });
  
    } catch (error) {
      console.error('Error:', error);
      return errorResponse('Server error', 500);
    }
  }