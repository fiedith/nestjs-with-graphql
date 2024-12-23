import { Injectable } from '@nestjs/common';
import { Board } from './entities/board.entity';
import { IBoardsServiceCreate } from './interfaces/boards-service.interface';

// injection scopes : Singleton (new only once) (default option)
//                    Request scope (new on every request)
//                    Transient scope (new on each injection)
@Injectable()
export class BoardsService {
  findAll(): Board[] {
    // 1. assuming we accessed DB & retrieved data
    const result = [
      {
        number: 1,
        writer: 'ryan',
        title: 'hello there?',
        contents: 'this is my content.',
      },
      {
        number: 2,
        writer: 'young',
        title: 'keep',
        contents: 'keep going',
      },
      {
        number: 3,
        writer: 'brian',
        title: 'macbook for sale',
        contents: 'dm for details',
      },
    ];

    // 2. return fetched data from DB to browser as response
    return result;
  }

  create({ createBoardInput }: IBoardsServiceCreate): string {
    // 1. logging data sent from browser
    console.log(createBoardInput.writer);
    console.log(createBoardInput.title);
    console.log(createBoardInput.contents);

    // 2. assuming we accessed DB & saved data

    // 3. return saved info to browser as response
    return 'successfully created article.';
  }
}
