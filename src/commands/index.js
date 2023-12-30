const welcome = require('./welcome.command');
const onSearch = require('./on-search.command');
const onAnimationMessage = require('./on-animation-message.command');
const onAnimationInfo = require('./on-animation-info.command');
const onDeleteAnimationInfo = require('./on-delete-animation-info.command');
const onReplyToAnimation = require('./on-reply-animation.command');

module.exports = {
  welcome,
  onSearch,
  onAnimationMessage,
  onAnimationInfo,
  onDeleteAnimationInfo,
  onReplyToAnimation,
};
