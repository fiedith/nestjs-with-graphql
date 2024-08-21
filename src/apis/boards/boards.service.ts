import { Injectable } from '@nestjs/common';

// injection scopes : Singleton (new only once) (default option)
//                    Request scope (new on every request)
//                    Transient scope (new on each injection)
@Injectable()
export class BoardsService {
  getBoards(): string {
    return 'Hello World!';
  }
}
