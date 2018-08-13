import Component from '@ember/component';
import layout from '../templates/components/log-out';

export default Component.extend({
  layout,
  actions: {
    logoff() {
      let widget = this.get('widget');
      widget.logout();
      return;
    }
  }
});
