function parents(root, p) {
    var parts = p.split('/');
    parts = parts.map(function(part, index) {
        return {
            'label': part,
            'url': '/' + root + '/' + 'tree' + '/'  + parts.slice(0, index + 1).join('/')
        };
    });
    parts[parts.length - 1].isLast = true;
    return parts;
}

function handleGitRequest(req, res) {
    var parts = req.url.split('/');
    req.url = '/' + parts.slice(2).join('/');
    gitServer.handle(req, res);
}

function checkoutRef(req, res) {
    var repo = repos[req.body.repo];
    if(!repo) {
        return res.render('404.jade');
    }

    repo.checkout(req.body.ref, function() {
        res.redirect('/' + req.body.repo + '/');
    });
}

function tree(req, res) {
    var name = req.params.name || req.params[0],
        entry = req.params[1] || '',
        repo = repos[name];

    if(!repo) {
        return res.render('404.jade');
    }

    repo.tree(entry, function(items, branches, tags) {
        if(!items) { res.render('404.jade'); }
        res.local('repo', name);
        res.local('parents', parents(name, entry));
        res.local('items', items);
        res.local('branches', branches);
        res.local('tags', tags);
        res.render('list.jade', res.locals());
    });
}

function blob(req, res) {
    var name = req.params[0],
        entry = req.params[1],
        repo = repos[name];

    if(!repo) {
        return res.render('404.jade');
    }

    repo.blob(entry, function(err, data) {
        if(err) { throw err; }
        res.local('repo', name);
        res.local('parents', parents(name, entry));
        res.local('preview', makePreview(req.url, data));
        res.render('display.jade', res.locals());
    });
}
