const AddedComment = require("../../Domains/comments/entities/AddedComment");
const NewComment = require("../../Domains/comments/entities/NewComment");

class AddCommentUseCase {
  constructor({ threadRepository, commentRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  async execute(useCasePayload) {
    const newComment = new NewComment(useCasePayload);
    await this._threadRepository.isThreadExist(newComment.threadId);
    const thread = await this._threadRepository.isThreadExist(newComment.threadId);
    if (!thread) {
      throw new Error('ADD_COMMENT_USE_CASE.THREAD_NOT_FOUND');
    }

    const addedComment = await this._commentRepository.addComment(newComment);
    return addedComment;
  }
}

module.exports = AddCommentUseCase;
