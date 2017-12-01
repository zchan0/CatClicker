const initialCats = [
    {
        clickCount: 0,
        name: 'Tabby',
        imgSrc: 'img/22252709_010df3379e_z.jpg',
        nicknames: ['Tabby Tabby Tabby']
    },
    {
        clickCount: 0,
        name: 'Telsa',
        imgSrc: 'img/434164568_fea0ad4013_z.jpg',
        nicknames: ['T-bone', 'Mr.T']
    },
    {
        clickCount: 0,
        name: 'Jack',
        imgSrc: 'img/1413379559_412a540d29_z.jpg',
        nicknames: ['Mr.J', 'Joker']
    },
    {
        clickCount: 0,
        name: 'Selina',
        imgSrc: 'img/4154543904_6e2428c421_z.jpg',
        nicknames: ['Little S', 'Princess']
    },
    {
        clickCount: 0,
        name: 'Ella',
        imgSrc: 'img/9648464288_2516b35537_z.jpg',
        nicknames: ['El']
    },
]

const Cat = function(data) {
    this.clickCount = ko.observable(data.clickCount);
    this.name = ko.observable(data.name);
    this.imgSrc = ko.observable(data.imgSrc);
    // observable arrays
    this.nicknames = ko.observableArray(data.nicknames);

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
}

const ViewModel = function() {
    // save viewmodel context
    const self = this;

    this.catList = ko.observableArray([]);
    initialCats.forEach(catItem => {
        self.catList.push(new Cat(catItem));
    });

    this.currentCat = ko.observable(self.catList()[0]);

    this.increClickCount = function() {
        self.currentCat().clickCount(self.currentCat().clickCount() + 1);
    };
}

ko.applyBindings( new ViewModel() );