const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const pool = require('../../database/postgres/pool');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const AddThread = require('../../../Domains/threads/entities/NewThread');

describe('ThreadRepositoryPostgres', () => {
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addThread', () => {
    it('should persist new thread and return added thread correctly', async () => {
      /**
       * @TODO 4
       * Lengkapi pengujian fungsi `addThread` agar kita dapat
       * memastikan bahwa fungsi tersebut memasukkan data ke dalam database dengan benar.
       *
       * Pada pengujian ini, manfaatkanlah fungsi `ThreadsTableTestHelper.findThreadById`
       * untuk mengecek data `thread` yang ada di database berdasarkan id thread.
       */
      await UsersTableTestHelper.addUser({});
      const addThread = new AddThread({
        title: 'a thread',
        body: 'this a body thread',
        owner: 'user-123',
      });
      const fakeIdGenerator = () => '123';
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
          pool,
          fakeIdGenerator,
      );
      const addedThread = await threadRepositoryPostgres.addThread(
          addThread
      );
      const thread = await ThreadsTableTestHelper.findThreadById(
          'thread-123',
      );

      expect(addedThread.id).toEqual('thread-123');
      expect(addedThread.title).toEqual(addThread.title);
      expect(addedThread.owner).toEqual(addThread.owner);

      expect(thread).toBeDefined();
    });
  });

  describe('isThreadExist', () => {
    it('should return true if thread exists', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await ThreadsTableTestHelper.addThread({ id: 'thread-123', owner: 'user-123' });
      const repository = new ThreadRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(repository.isThreadExist('thread-123')).resolves.toBe(true);
    });

    it('should return false if thread not exists', async () => {
      // Arrange
      const repository = new ThreadRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(repository.isThreadExist('thread-123')).resolves.toBe(false);
    });
  });

  describe('getThreadById', () => {
    it('should return null if thread not exists', async () => {
      // Arrange
      const repository = new ThreadRepositoryPostgres(pool, {});

      // Action
      const thread = await repository.getThreadById('thread-123');

      // Assert
      expect(thread).toBeNull();
    });

    it('should return thread correctly', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await ThreadsTableTestHelper.addThread({ id: 'thread-123', owner: 'user-123' });
      const repository = new ThreadRepositoryPostgres(pool, {});

      // Action
      const thread = await repository.getThreadById('thread-123');

      // Assert
      expect(thread.id).toEqual('thread-123');
      expect(thread.title).toEqual('title');
      expect(thread.body).toEqual('body');
      expect(thread.date).toEqual(expect.any(String));
      expect(thread.username).toEqual('dicoding');
      expect(thread.comments).toEqual([]);
    });
  });
});
