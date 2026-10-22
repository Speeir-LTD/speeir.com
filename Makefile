# Deploy with the Netlify CLI: builds locally and uploads, so it works even
# though Netlify can't build this private org repo from GitHub.
# One-time setup per machine: `make login`.

.PHONY: login switch deploy-test deploy-prod

login:
	netlify login
	netlify link

# Pick which saved Netlify account the CLI uses, or log in to a new one.
switch:
	netlify switch

# Draft deploy: prints a preview URL, leaves speeir.com untouched.
deploy-test:
	netlify deploy --build --message "Draft: $$(git log -1 --pretty=%h\ %s)"

# Production deploy to speeir.com. Refuses to ship uncommitted changes, so what's
# live always matches a commit. Costs Netlify credits.
deploy-prod:
	@git diff --quiet HEAD || (echo "Uncommitted changes: commit or stash them before deploying to prod." && exit 1)
	netlify deploy --build --prod --message "Prod: $$(git log -1 --pretty=%h\ %s)"
