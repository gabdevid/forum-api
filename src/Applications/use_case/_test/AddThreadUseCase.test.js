import ThreadRepository from '../../../Domains/threads/ThreadRepository';
import AddedThread from '../../../Domains/threads/entities/AddedThread';
import AddThreadUseCase from '../AddThreadUseCase';

describe('AddThreadUseCase', () => {
  it('should orchestrating the add thread action correctly', async () => {
   
    // Arrange
    const mockThreadRepository = new ThreadRepository();
    const mockReturnAddedThread = {
      id: 'thread-123',
      title: 'title',
      owner: 'user-123',
    };

    mockThreadRepository.addThread = jest.fn(() => Promise.resolve(mockReturnAddedThread));


    const useCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository,
    });
    const useCasePayload = {
      id: 'thread-123',
      body: 'body',
      owner: 'user-123',
    };

    const expectedAddedThread = new AddedThread({
      id: 'thread-123',
      title: 'title',
      owner: 'owner',
    });

    // Action
    const addedThread = await useCase.execute(useCasePayload);

    // Assert
    expect(addedThread).toStrictEqual(expectedAddedThread);
    expect(mockThreadRepository.addThread).toBeCalledWith(useCasePayload);
  });
});
