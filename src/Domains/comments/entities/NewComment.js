class NewComment {

  constructor(payload) {
    this._verifyPayload(payload);

    // Lengkapi kodenya ...
    const { threadId, content, owner } = payload;

    this.threadId = threadId;
    this.content = content;
    this.owner = owner;
  }

  _verifyPayload(payload) {
    // Lengkapi kodenya ...v
    const { threadId, content, owner } = payload;

    if (!threadId || !content || !owner) {
      throw new Error('NEW_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof threadId !== 'string'
      || typeof content !== 'string'
      || typeof owner !== 'string'
    ) {
      throw new Error('NEW_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = NewComment;
