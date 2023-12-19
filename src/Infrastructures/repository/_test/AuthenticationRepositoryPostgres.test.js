import InvariantError from '../../../Commons/exceptions/InvariantError';
import { cleanTable, findToken, addToken } from '../../../../tests/AuthenticationsTableTestHelper';
import pool, { end } from '../../database/postgres/pool';
import AuthenticationRepositoryPostgres from '../AuthenticationRepositoryPostgres';

describe('AuthenticationRepository postgres', () => {
  afterEach(async () => {
    await cleanTable();
  });

  afterAll(async () => {
    await end();
  });

  describe('addToken function', () => {
    it('should add token to database', async () => {
      // Arrange
      const authenticationRepository = new AuthenticationRepositoryPostgres(pool);
      const token = 'token';

      // Action
      await authenticationRepository.addToken(token);

      // Assert
      const tokens = await findToken(token);
      expect(tokens).toHaveLength(1);
      expect(tokens[0].token).toBe(token);
    });
  });

  describe('checkAvailabilityToken function', () => {
    it('should throw InvariantError if token not available', async () => {
      // Arrange
      const authenticationRepository = new AuthenticationRepositoryPostgres(pool);
      const token = 'token';

      // Action & Assert
      await expect(authenticationRepository.checkAvailabilityToken(token))
        .rejects.toThrow(InvariantError);
    });

    it('should not throw InvariantError if token available', async () => {
      // Arrange
      const authenticationRepository = new AuthenticationRepositoryPostgres(pool);
      const token = 'token';
      await addToken(token);

      // Action & Assert
      await expect(authenticationRepository.checkAvailabilityToken(token))
        .resolves.not.toThrow(InvariantError);
    });
  });

  describe('deleteToken', () => {
    it('should delete token from database', async () => {
      // Arrange
      const authenticationRepository = new AuthenticationRepositoryPostgres(pool);
      const token = 'token';
      await addToken(token);

      // Action
      await authenticationRepository.deleteToken(token);

      // Assert
      const tokens = await findToken(token);
      expect(tokens).toHaveLength(0);
    });
  });
});
