import Component from '@ember/component';
import layout from '../templates/components/log-out';

export default Component.extend({
  layout,
  classNames: ["logout"],
  actions: {
    logoff() {
      let widget = this.get('widget');
      widget.logout();
      return;
    }
  }
});
