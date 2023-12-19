const ThreadRepository = require('../ThreadRepository');
const ThreadRepository = require('../ThreadRepository');

describe('ThreadRepository abstract', () => {
  it('should throw error when invoke abstract behavior', async () => {
   
    // Arrange
    const threadRepository = new ThreadRepository();

    // // Action
    // const addThread = threadRepository.addThread({});
    // const isThreadExist = threadRepository.isThreadExist('');
    // const getThreadById = threadRepository.getThreadById('');

    // // Assert
    // await expect(addThread).rejects.toThrowError('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    // await expect(isThreadExist).rejects.toThrowError('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    // await expect(getThreadById).rejects.toThrowError('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');

    //Action & Assert
    await expect(threadRepository.addThread({})).rejects.toThrowError('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(threadRepository.isThreadExist('')).rejects.toThrowError('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(threadRepository.getThreadById('')).rejects.toThrowError('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED')

  });
});
