var Base = require("./BasePage");

function SpecPage() {

    this.firstInput    = $('.input-small:nth-child(1)');
    this.secondInput   = $('.input-small:nth-child(3)');
    this.goButton      = $('#gobutton');
    this.linkNaN       = element(by.xpath("//a[contains(text(),'NaN')]"));
    this.resultFirst   = element(by.xpath("//body/div/div/form/div/div/h2"));
    this.resultHistory = element.all(by.xpath("//tr/td[3]"));
    this.dropdownMenu  = $('#operationsCtrl');
    this.mathOperators = element.all(by.xpath('//*[@id="operationsCtrl"]/option')); //operators +,-,*,/
    this.history       = element.all(by.repeater('result in memory|limitTo:5')); //memory

    this.UrlNan = 'https://en.wikipedia.org/wiki/NaN';

    this.mathOperation = function(firstValue, secondValue) {
        this.firstInput.sendKeys(firstValue);
        this.secondInput.sendKeys(secondValue);
        this.goButton.click();
    };

    this.diffrentOperation = function(firstValue, secondValue, operators) {
        this.firstInput.sendKeys(firstValue);
        this.secondInput.sendKeys(secondValue);
        this.dropdownMenu.click();
        this.mathOperators.get(operators).click();
        this.goButton.click();
    };

    this.getNewWindowHandles = function() {
        browser.getAllWindowHandles().then(function(handles) {
            newWindowHandle = handles[1];
            browser.switchTo().window(newWindowHandle);
        });
    };

    this.returnOldWindowHandles = function() {
        browser.driver.close();
        browser.getAllWindowHandles().then(function(handles) {
            oldWindowHandle = handles[0];
            browser.switchTo().window(oldWindowHandle);
        });
    };
}

SpecPage.prototype = Object.create(Base.prototype);
module.exports = SpecPage;