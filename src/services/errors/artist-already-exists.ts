export class ArtistAlreadyExists extends Error {
  constructor() {
    super('Artist already exists.');
  }
}