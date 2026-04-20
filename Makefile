.PHONY: test

test:
	$(MAKE) -C backend test
	$(MAKE) -C frontend test
