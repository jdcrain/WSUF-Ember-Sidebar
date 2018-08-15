import layout from '../templates/components/nav-link-to';
import LinkComponent from '@ember/routing/link-component';

export default LinkComponent.extend({
  layout,
  tagName: 'li'
});