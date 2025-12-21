import { createMockApplication, MockApplication } from "../../tests/mocks/application.mock.js";
import { Application } from "./application.js";


describe('Application Abstract Class Unit Tests', () => {

  it('should initialise', () => {
    const application = new MockApplication();
    expect(application).toBeInstanceOf(Application);
  });
  
  
  it('should expose the render method', () => {
    const application = createMockApplication();
    expect(typeof application.run).toBe('function');
    expect(typeof application.close).toBe('function');
    });
    
});


