import { SitioWebPage } from './app.po';

describe('sitio-web App', () => {
  let page: SitioWebPage;

  beforeEach(() => {
    page = new SitioWebPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
