import Component from '@ember/component';
import layout from '../templates/components/wsuf-sidebar';
import fetch from 'fetch';
import { task, timeout } from 'ember-concurrency';

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
      let url = this.get('APIUrl') + '/oktauser/' + id + '/apps';
      const context = this;

      let resp = yield fetch(url);
      let apps = yield resp.json();

      let appList = [];
      
      for (let i = 0; i < apps.length; i++) {
          appList.addObject(apps[i]);
          context.set('apps', appList);
          yield timeout(100);
      }

  }).drop(),
});
