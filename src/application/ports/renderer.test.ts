import { Game } from "../../core/game/game.js";
import { Renderer } from "./renderer.js";


class TestRenderer extends Renderer {
  constructor(public game: Game = game) { super() }
  public render(out: string | void): void {
    return
  };
}


describe('Renderer Abstract Class Unit Tests', () => {

  it('should initialise', () => {
    const game = new Game();
    const renderer = new TestRenderer(game);
    expect(renderer).toBeInstanceOf(Renderer);
  });
  
  
  it('should expose the render method', () => {
    const game = new Game();
    const renderer = new TestRenderer(game);
    expect(typeof renderer.render).toBe('function');
    });
    
});

