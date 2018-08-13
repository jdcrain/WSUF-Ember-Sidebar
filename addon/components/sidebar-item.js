import Component from '@ember/component';
import layout from '../templates/components/sidebar-item';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
  layout,

  tagName: 'li',
  classNameBindings: ['isShown'],
  isShown: '',

  didReceiveAttrs() {
      this._super(...arguments);
      this.get('animate').perform();
  },

  animate: task(function * () {
      yield timeout(50);
      this.set('isShown', 'show');
  })

});
