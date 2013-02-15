updateBootstrap:
	git clone -b 3.0.0-wip git://github.com/twitter/bootstrap.git tmp-bootstrap-repo
	rm -rf less/bootstrap/*
	cp -r tmp-bootstrap-repo/less/*.less less/bootstrap/
	rm -rf tmp-bootstrap-repo
