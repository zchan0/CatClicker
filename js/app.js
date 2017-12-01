const Cat = function() {
    this.clickCount = ko.observable(0);
    this.name = ko.observable('Tabby');
    this.imgSrc = ko.observable('img/4154543904_6e2428c421_z.jpg');

    // computed variables
    this.level = ko.computed(function() {
        const clicks = this.clickCount();
        if (clicks < 10) {
            return 'Newborn';
        } else if (clicks < 50) {
            return 'Infant';
        } else if (clicks < 100) {
            return 'Child';
        } else if (clicks < 200) {
            return 'Teen';
        } else if (clicks < 500) {
            return 'Ninja';
        }
    }, this);

    // observable arrays
    this.nicknames = ko.observableArray([
        'Tabby',
        'T-bone',
        'Mr.T',
        'BigEgg',
        'BigBie'
    ]);
}

const ViewModel = function() {
    this.currentCat = ko.observable(new Cat());
    this.increClickCount = function() {
        this.currentCat().clickCount(this.currentCat().clickCount() + 1);
    };
}

ko.applyBindings(new ViewModel());