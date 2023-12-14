const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddThreadUseCase = require('../AddThreadUseCase');

describe('AddThreadUseCase', () => {
  it('should orchestrating the add thread action correctly', async () => {
    const mockThreadRepository = new ThreadRepository();
    const mockReturnAddThread = {
      id: 'thread-123',
      title: 'sebuah thread',
      owner: 'user-123',
    };
    mockThreadRepository.addThread = jest.fn(() => Promise.resolve(mockReturnAddThread));
    const useCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository,
    });
    const useCasePayload = {
      title: 'sebuah thread',
      body: 'sebuah body thread',
      owner: 'user-123',
    };
    const expectedAddedThread = {
      id: 'thread-123',
      title: 'sebuah thread',
      owner: 'user-123',
    };

    const addedThread = await useCase.execute(useCasePayload);

    expect(addedThread).toStrictEqual(expectedAddedThread);
    expect(mockThreadRepository.addThread).toBeCalledWith(useCasePayload);
  });
});
