import Component from '@ember/component';
import layout from '../templates/components/wsuf-sidebar';
import fetch from 'fetch';
import { task, timeout, race } from 'ember-concurrency';

export default Component.extend({
  layout,
  tagName: 'nav',
  classNames: ["wsuf-sidenav"],
  attributeBindings: ['id', 'tabindex'],
  id: "sidebar",
  tabindex: "0",

  didUpdateAttrs() {
    this._super(...arguments);
    let userId = this.get('userId');
    if (userId) {
        this.get('getApps').perform(userId);
    }
  },

  getApps: task(function * (id) {
    let url = `${this.get('APIUrl')}/oktauser/${id}/apps`;
    const context = this;

    let resp = this.get('fetchApps').perform(url);
    yield race([resp, timeout(30000)]);
    
    if (resp.isSuccessful) {
        let apps = yield resp.json();

        let appList = [];

        for (let i = 0; i < apps.length; i++) {
            appList.addObject(apps[i]);
            context.set('apps', appList);
            yield timeout(100);
        }
    }
    else {
        resp.cancel();
        this.set('apps', []);
    }

  }).drop(),

  fetchApps: task(function * (url) {
    return yield fetch(url);
  }).drop()
});
