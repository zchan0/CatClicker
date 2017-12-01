// model
class Cat {
    constructor(name) {
        this.name = `cat_` + name;
        this.src  = 'img/' + this.name + '.jpg';
        this.clickCount = 0;
    }

    increClickCount() {
        this.clickCount++;
    }
}

// view
class Widget {
    constructor(name, src) {
        this.img = $('<img>', {
            'src': src,
            'alt': name,
            'id': name
        });
        this.cntSpan = $('<span>').text('0');
        this.nameSpan = $('<span>').text(`${name} `);
        const caption = $('<p>');
        caption.append(this.nameSpan);
        caption.append(this.cntSpan);
        this.widget = $('<div>', {
            'class': 'widget'
        });
        this.widget.hide();
        this.widget.append(this.img);
        this.widget.append(caption);
    }

    addClickHandler(handler) {
        this.img.click(handler);
    }

    updateCount(cnt) {
        this.cntSpan.text(cnt);
    }

    updateName(name) {
        this.nameSpan.text(`${name} `);
    }

    updateImage(src) {
        this.img.attr('src', src);
    }

    render(name, src, cnt) {
        this.updateName(name);
        this.updateImage(src);
        this.updateCount(cnt);
    }
}

class List {
    constructor(contents) {
        this.ul = $('<ul>');
        this.lis = [];
        contents.forEach(content => {
            const li = $('<li>').text(content);
            this.ul.append(li);
            this.lis.push(li);
        });
    }

    addClickHandler(handler) {
        this.lis.forEach(li => {
            li.click(handler);
        });
    }
}

class AdminPanel {
    constructor() {
        this.adminButton = $('<button>', {
            'name': 'admin'
        }).text('Admin');

        this.panel = $('.admin-panel');
        this.nameInput = $('#name');
        this.imgSrcInput = $('#imgSrc');
        this.clicksInput = $('#clicks');
        this.submitBtn = $(`button[name = 'submit']`);
        this.cancelBtn = $(`button[name = 'cancel']`);

        const that = this;
        this.adminButton.click(function() {
            that.panel.toggle();
        });
        this.cancelBtn.click(function() {
            that.panel.toggle();
        });
    }

    render(name, src, clickCount) {
        this.nameInput.val(name);
        this.imgSrcInput.val(src);
        this.clicksInput.val(clickCount);
    }

    addClickHandler(handler) {
        const that = this;
        this.submitBtn.click(function() {
            const cat = {
                'name': that.nameInput.val(),
                'src': that.imgSrcInput.val(),
                'clickCount': that.clicksInput.val()
            }
            handler(cat);
        });
    }
}

// octopus
class Controller {
    constructor() {
        this.cats = [];
        for (let index = 0; index < 5; index++) {
            const cat = new Cat(index);
            this.cats.push(cat);
        }

        this.widgets = [];
        this.cats.forEach(cat => {
            const w = new Widget(cat.name, cat.src);
            this.widgets.push(w);
        });

        const names = this.cats.reduce((names, cat) => {
            return names.concat(cat.name);
        }, []);
        this.list = new List(names);

        // panel
        this.admin = new AdminPanel();
        this.admin.panel.hide();
        this.list.ul.append(this.admin.adminButton);

        // init
        this.currentIndex = 0;
        this.widgets[0].widget.show();

        this.setupHandlers();

        // render once
        this.widgets.forEach(w => {
            $('.widgets').append(w.widget);
        });

        $('.list').append(this.list.ul);

        this.render();
    }

    setupHandlers() {
        const that = this;
        this.widgets.forEach(widget => {
            widget.addClickHandler(e => {
                that.updateCount(e.target.id);
            });
        });
        this.list.addClickHandler(e => {
            that.switchCat(e.target.textContent);
        });
        this.admin.addClickHandler(cat => {
            // widget
            that.widgets[that.currentIndex].render(cat.name, cat.src, cat.clickCount);
            // list
            that.list.lis[that.currentIndex].text(cat.name);
            that.admin.panel.hide();
        });
    }

    render() {
        const cat = this.cats[this.currentIndex];
        this.admin.render(cat.name, cat.src, cat.clickCount);
    }

    switchCat(toCat) {
        const index = this.getIndexByName(toCat);
        this.widgets[this.currentIndex].widget.hide();
        this.currentIndex = index;
        this.widgets[index].widget.show();
    }

    updateCount(catName) {
        const index = this.getIndexByName(catName);
        const clickedCat = this.cats[index];
        clickedCat.increClickCount();
        this.widgets[index].updateCount(clickedCat.clickCount);
        this.admin.clicksInput.val(clickedCat.clickCount);
    }

    getIndexByName(catName) {
        return catName.split('_')[1];
    }
}

new Controller();
