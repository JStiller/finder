(function(DOMParser) {
    var
        DOMParser_proto = DOMParser.prototype
    , real_parseFromString = DOMParser_proto.parseFromString
    ;

    // Firefox/Opera/IE throw errors on unsupported types
    try {
        // WebKit returns null on unsupported types
        if ((new DOMParser).parseFromString("", "text/html")) {
            // text/html parsing is natively supported
            return;
        }
    } catch (ex) {}

    DOMParser_proto.parseFromString = function(markup, type) {
        if (/^\s*text\/html\s*(?:;|$)/i.test(type)) {
            var
                doc = document.implementation.createHTMLDocument("")
            ;
                if (markup.toLowerCase().indexOf('<!doctype') > -1) {
                    doc.documentElement.innerHTML = markup;
                }
                else {
                    doc.body.innerHTML = markup;
                }
            return doc;
        } else {
            return real_parseFromString.apply(this, arguments);
        }
    };
}(DOMParser));

describe("describe", function() {
    var _base = null,
        _dom = null;

    beforeEach(function() {
        _base = new base();
        _parser = new DOMParser();
        _document = "<!DOCTYPE html><html lang='de'><head><meta charset='utf-8' /><title>Finder</title><meta name='description' content='' /><meta name='viewport' content='width=device-width, initial-scale=1.0, user-scalable=no' /><link href='/finder/images/favicon.ico' rel='shortcut icon' sizes='16x16' title='Icon' type='image/x-icon' /><link href='/finder/css/base.css' media='screen, projection' rel='stylesheet' title='Screen' type='text/css' /></head><body><header><form><fieldset><label><input type='search' placeholder='' onkeyup='test.search(this.value)' /></label><input type='submit' /></fieldset></form></header><main><dl><dd>Development</dd><dt>Development 01 - App 01</dt><dt>Development 01 - App 02</dt><dt>Development 01 - Loadbalancer</dt><dt>Development 01 - Admin</dt><dt>Development 02 - App 01</dt><dt>Development 02 - App 02</dt><dt>Development 02 - Loadbalancer</dt><dt>Development 02 - Admin</dt><dt>Development 03 - App 01</dt><dt>Development 03 - App 02</dt><dt>Development 03 - Loadbalancer</dt><dt>Development 03 - Admin</dt><dt>Development 04 - App 01</dt><dt>Development 04 - App 02</dt><dt>Development 04 - Loadbalancer</dt><dt>Development 04 - Admin</dt><dt><mark>Deve</mark>lopment 04 - Admin</dt><dt>Development 04 - Admin</dt></dl><dl><dd>Stageing</dd><dt>Stageing - App 01</dt><dt>Stageing - App 02</dt><dt>Stageing - Loadbalancer</dt><dt>Stageing - Admin</dt><dt>Development 04 - Admin</dt></dl><dl><dd>Production</dd><dt>Production - App 01</dt><dt>Production - App 02</dt><dt>Production - App 03</dt><dt>Production - App 04</dt><dt>Production - Loadbalancer</dt><dt>Production - Admin</dt></dl><dl><dd>Deployment</dd><dt>Jenkins</dt><dt>Bitbucket</dt></dl><dl><dd>Ticket-System</dd><dt>TWT - JIRA</dt><dt>LASCANA - JIRA</dt><dt>LASCANA - Trello</dt><dt>UM* - ServiceDesk</dt></dl><dl><dd>Monitoring</dd><dt>UM* Infrastucture</dt><dt>LASCANA - Groundwork</dt><dt>LASCANA - MuninMX</dt><dt>Pingdom</dt><dt>ELK-Stack</dt></dl><dl><dd>Analytics</dd><dt>Webtrekk</dt><dt>eCom Insights Report</dt></dl></main><footer></footer><script type='text/javascript' src='/finder/javascript/javascript.js'></script></body></html>";
        _dom = _parser.parseFromString(_document, 'text/html');
    });

    afterEach(function() {
        delete _base;
    });

    it("it", function() {
        expect(new base()).toEqual(jasmine.any(Object));
        expect(new base()).not.toEqual(null);
        expect(new base()).not.toEqual(undefined);
        expect(new base()).not.toEqual("");
        expect(new base()).not.toEqual([]);
    });

    it("it", function() {
        expect(Object.keys(_base).length).toEqual(2);
        expect(Object.keys(_base)).toEqual(["getDefinitionLists", "search"]);
    });

    it("it", function() {
        var nodes = _dom.querySelectorAll('dl');
        _base.getDefinitionLists(nodes);
        _base.search('Jenkins');
        expect(nodes.querySelectorAll('dt:not(.hidden)').length).toEqual(1);
    });

    it("it", function() {
        var nodes = _dom.querySelectorAll('dl');
        _base.getDefinitionLists(nodes);
        _base.search('Development');
        expect(nodes.querySelectorAll('dt:not(.hidden)').length).toEqual(19);
    });

    it("it", function() {
        var nodes = helper.querySelectorAll('dl', _dom);
        _base.getDefinitionLists(nodes);
        _base.search('Development');
        expect(nodes.querySelectorAll('dt:not(.hidden)').length).toEqual(19);
    });

    it("it", function() {
        var nodes = helper.querySelectorAll('dl', _dom);
        _base.getDefinitionLists(nodes);
        _base.search('Development 04 - Admin');
        expect(nodes.querySelectorAll('dt:not(.hidden)').length).toEqual(4);
    });
});