.PHONY: test test-backend test-frontend

test:
	$(MAKE) test-backend
	$(MAKE) test-frontend

test-backend:
	$(MAKE) -C backend test

test-frontend:
	$(MAKE) -C frontend test
