updateBootstrap:
  git clone git://github.com/twitter/bootstrap.git tmp-bootstrap-repo
  rm -rf app/styles/bootstrap/*
  cp -r tmp-bootstrap-repo/less/*.less app/styles/bootstrap/
  rm -rf tmp-bootstrap-repo
