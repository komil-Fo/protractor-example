var fs = require('fs'),
    EC = protractor.ExpectedConditions;

function BasePage() {
    // for smth provide
}

BasePage.prototype.setUp = function() {
    browser.ignoreSynchronization = true;
    browser.manage().timeouts().implicitlyWait(15000);
    browser.driver.manage().window().maximize();
};

BasePage.prototype.waitForElementPresent = function(element) {
    browser.wait(function() {
        return element.isPresent();
    });
};

module.exports = BasePage;