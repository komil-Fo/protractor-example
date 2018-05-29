var Spec      =  require("../pageObjects/SpecTestPage"),
    spec;

describe('slow calculator', function () {

    beforeAll(function() {
        spec = new Spec();
    });

    beforeAll(function() {
        spec.setUp();
    });

    beforeEach(function () {
        browser.get(browser.baseUrl);
    });

    it('should add numbers', function () {
        spec.mathOperation(4, 5);
        expect((spec.resultHistory.get(0)).getText()).toEqual('9');
    });

    it('should verify all simple math operations exist in the dropdown menu (+,-,*,/)', function () {
       var expected = ['5', '20', '8', '12'];
        for (var i = 0; i < 4; ++i) {
            spec.diffrentOperation(10, 2, i);
            spec.waitForElementPresent(spec.resultHistory.get(i));
        }

        for (var i = 0; i < 4; ++i) {
            expect(spec.resultHistory.get(i).getText()).toEqual(expected[i]);
        }
    });

    describe('memory', function () {
        it('should start out with an empty memory', function () {
            expect((spec.history).count()).toEqual(0);
        });

        it('should fill the memory with past results', function () {
            spec.mathOperation(1, 2);
            spec.waitForElementPresent(spec.resultHistory.get(0));
            spec.mathOperation(4, 5);
            spec.waitForElementPresent(spec.resultHistory.get(1));
            expect((spec.history).count()).toEqual(2);
            expect((spec.resultHistory.get(1)).getText()).toEqual('3');
        });

        it('should only display the last 5 results window', function () {
            for (var i = 0; i < 5; ++i) {
                spec.mathOperation(1, 2);
                spec.waitForElementPresent(spec.resultHistory.get(i));
            }
            browser.sleep(1000).then(function () {
                spec.mathOperation(5, 5);
                return browser.sleep(1000)
            }).then(function () {
                expect((spec.history).count()).toEqual(5);
                expect((spec.resultHistory.get(4)).getText()).not.toEqual('10');
            });
        })
    });

    describe('check special functions', function () {

        it('should test that results that equal 42 are colored red', function () {
            spec.mathOperation(20, 22);
            spec.waitForElementPresent(spec.resultHistory.get(0));
            expect((spec.resultFirst).getCssValue("color")).toEqual('rgba(255, 0, 0, 1)');
        });

        it('should print NaN with link to wikipedia (https://en.wikipedia.org/wiki/NaN) if result is NaN', function () {
            spec.goButton.click();
            spec.waitForElementPresent(spec.resultHistory.get(0));
            browser.sleep(1000).then(function () {
                spec.linkNaN.click();
                return browser.sleep(1000)
            }).then(function () {
                spec.getNewWindowHandles();
                expect(browser.getCurrentUrl()).toEqual(spec.UrlNan);
                return browser.sleep(1000)
            }).then(function () {
                spec.returnOldWindowHandles();
            });
        });
    })
});
