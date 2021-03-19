import { Browser, Page, launch } from "puppeteer";
import config from "./config";
import { AUSLÄNDERBERHÖRDE_URL } from "./constants";

export default class Appointer {
  private browser: Browser;
  private page: Page;

  public async run() {
    await this.init();
    await this.goToCalendarPage();
  }

  private async init() {
    this.browser = await launch({
      headless: false,
      args: ["--start-maximized"],
    });
    this.page = await this.browser.newPage();
  }

  private async goToCalendarPage() {
    const newAppointmentButtonSelector = ".CBR28";
    const nationalityDropdownSelector = ".CBR50";
    const argentinienOption = "323";
    const lebenSieZusammenDropdownSelector = ".CBR12v";
    const anliegenTypeSelector = ".CBR12o";
    const anliegenOption = "329328";
    const dieInformationenCheckboxSelector = ".CBR106";
    const firstWeiterButtonSelector = ".CBR16h";
    const vornameFieldSelector = ".CBR8r";
    const nachnameFieldSelector = ".CBR8t";
    const birthdayDropdownSelector = ".CBR90";
    const birthMonthDropdownSelector = ".CBR91";
    const birthYearFieldSelector = ".CBR92";
    const anzahlDerPersonenFieldSelector = ".CBR9i";
    const emailFieldSelector = ".CBR8v";
    const besitzenSieSelector = ".CBRa7";
    const secondWeiterButtonSelector = ".CBR14b";

    await this.page.goto(AUSLÄNDERBERHÖRDE_URL);
    await this.page.click(newAppointmentButtonSelector);
    await this.page.waitForNavigation();
    await this.page.select(nationalityDropdownSelector, argentinienOption);
    await this.page.waitForNavigation();
    await this.page.select(lebenSieZusammenDropdownSelector, "Nein");
    await this.page.waitForNavigation();
    await this.page.select(anliegenTypeSelector, anliegenOption);
    await this.page.waitForNavigation();
    await this.page.click(dieInformationenCheckboxSelector);
    await this.page.click(firstWeiterButtonSelector);

    await this.page.waitForNavigation();

    await this.wait(400);
    await this.page.select(birthdayDropdownSelector, config.birthday.day);
    await this.wait(400);
    await this.page.select(birthMonthDropdownSelector, config.birthday.month);
    await this.wait(400);

    await this.page.select(anzahlDerPersonenFieldSelector, "1");
    await this.wait(400);
    await this.page.select(besitzenSieSelector, "Nein");
    await this.wait(400);

    await this.page.type(birthYearFieldSelector, config.birthday.year);
    await this.page.type(emailFieldSelector, config.email);
    await this.page.type(vornameFieldSelector, config.name.first);
    await this.page.type(nachnameFieldSelector, config.name.last);
    await this.wait(400);

    await this.page.click(secondWeiterButtonSelector);
  }

  private wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
