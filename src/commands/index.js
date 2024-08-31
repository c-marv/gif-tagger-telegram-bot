const welcome = require('./welcome.command');
const onSearch = require('./on-search.command');
const onAnimationMessage = require('./on-animation-message.command');
const onAnimationInfo = require('./on-animation-info.command');
const onDeleteMessageInfo = require('./on-delete-message-info.command');
const onReplyToAnimation = require('./on-reply-animation.command');
const onTagsInfo = require('./on-tags-info.command');

module.exports = {
  welcome,
  onSearch,
  onAnimationMessage,
  onAnimationInfo,
  onDeleteMessageInfo,
  onReplyToAnimation,
  onTagsInfo,
};
