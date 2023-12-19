import { cleanTable, findThreadsById, addThread } from "../../../../tests/ThreadTableTestHelper";
import { cleanTable as _cleanTable, addUser } from "../../../../tests/UsersTableTestHelper";
import NotFoundError from "../../../Commons/exceptions/NotFoundError";
import AddedThread from "../../../Domains/threads/entities/AddedThread";
import NewThread from "../../../Domains/threads/entities/NewThread";
import pool, { end } from "../../database/postgres/pool";
import ThreadRepositoryPostgres from "../ThreadRepositoryPostgres";

describe("ThreadRepositoryPostgres", () => {
  afterEach(async () => {
    await cleanTable();
    await _cleanTable();
  });

  afterAll(async () => {
    await end();
  });

  describe("addThread function", () => {
    it("should persist new thread and return added thread corerrecly", async () => {
      // Arrange
      await addUser({
        username: "ardi",
        password: "secret",
      });
      const newThread = new NewThread({
        title: "Thread title test",
        body: "Thread body test",
        owner: "user-123",
      });

      const fakeIdGenerator = () => "123";
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // Action
      await threadRepositoryPostgres.addThread(newThread);

      // Assert
      const threads = await findThreadsById("thread-123");
      expect(threads).toHaveLength(1);
    });

    it("should return added thread correctly", async () => {
      // Arrange
      await addUser({
        username: "ardi",
        password: "secret",
      });
      const newThread = new NewThread({
        title: "Thread title test",
        body: "Thread body test",
        owner: "user-123",
      });

      const fakeIdGenerator = () => "123";
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // Action
      const addedThread = await threadRepositoryPostgres.addThread(newThread);

      // Assert
      expect(addedThread).toStrictEqual(
        new AddedThread({
          id: "thread-123",
          title: "Thread title test",
          owner: "user-123",
        })
      );
    });
  });

  describe("verifyAvailableThread function", () => {
    it("should throw NotFoundError when thread not found", async () => {
      // Arrange
      const threadId = "thread-123";
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        () => {}
      );

      // Action and Assert
      await expect(
        threadRepositoryPostgres.verifyAvailableThread(threadId)
      ).rejects.toThrowError(NotFoundError);
    });

    it("should not throw NotFoundError when thread found", async () => {
      // Arrange
      await addUser({ id: "user-123" });
      await addThread({
        id: "thread-123",
        owner: "user-123",
      });
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        () => {}
      );

      // Action and Assert
      await expect(
        threadRepositoryPostgres.verifyAvailableThread("thread-123")
      ).resolves.not.toThrowError(NotFoundError);
    });
  });

  describe("getDetailThreadByThreadId function", () => {
    it("should throw NotFoundError when thread not found", async () => {
      // Arrange
      const threadId = "thread-123";
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        () => {}
      );

      // Action
      await expect(
        threadRepositoryPostgres.getDetailThreadByThreadId(threadId)
      ).rejects.toThrowError(NotFoundError);
    });

    it("should return detail thread correctly", async () => {
      // Arrange
      const threadId = "thread-123";
      const payloadThread = {
        id: threadId,
        owner: "user-123",
        title: "Thread title test",
        body: "Thread body test",
        date: new Date("2023-10-26T15:34:43.671Z"),
      };
      await addUser({ id: "user-123", username: "ardi" });
      await addThread(payloadThread);

      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        () => {}
      );

      // Action
      const detailThread =
        await threadRepositoryPostgres.getDetailThreadByThreadId(threadId);

      // Assert
      expect(detailThread).not.toBeUndefined();
      expect(detailThread).toEqual({
        id: payloadThread.id,
        title: payloadThread.title,
        body: payloadThread.body,
        date: payloadThread.date,
        username: "ardi",
      });
      expect(detailThread.id).toBeDefined();
      expect(detailThread.title).toBeDefined();
      expect(detailThread.body).toBeDefined();
      expect(detailThread.date).toBeDefined();
      expect(detailThread.username).toBeDefined();
    });
  });
});
