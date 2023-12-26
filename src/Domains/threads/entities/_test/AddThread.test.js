const AddThread = require('../AddThread');
const {add} = require("nodemon/lib/rules");

describe('AddThread entities', () => {
    it('should throw error when payload did not contain needed property', () => {
        // Arrange
        const payload = {
            id: 'thread-123',
        };

        // Action and Assert
        expect(() => new AddThread(payload))
            .toThrowError('ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload did not meet data type specification', () => {
        // Arrange
        const payload = {
            title: true,
            body: "this is a body",
            owner: "user-123",
        };

        // Action and Assert
        expect(() => new AddThread(payload))
            .toThrowError('ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should create addThread object correctly', () => {
        const payload = {
            title: 'thread-title',
            body: 'this is a body',
            owner: 'thread-owner',
        };

        const {title, body, owner} = new AddThread(payload);

        expect(title).toEqual(payload.title);
        expect(body).toEqual(payload.body);
        expect(owner).toEqual(payload.owner);
    });
});