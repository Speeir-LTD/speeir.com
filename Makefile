
deploy:
	@echo "Deploying the application..."
	@echo "Building application"
	@npm i && \
	npm run build && \
	netlify build 
	@(netlify deploy --prod --message "Deploying to production v1")