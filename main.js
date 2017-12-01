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
        const caption = $('<p>').text('click ');
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

// octopus
class Controller {
    constructor() {
        this.cats = [];
        for (let index = 0; index < 4; index++) {
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

        this.currentIndex = 0;
        this.widgets[0].widget.show();

        this.setupHandlers();
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
    }

    render() {
        this.widgets.forEach(w => {
            $('.widgets').append(w.widget);
        });

        $('.list').append(this.list.ul);
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
    }

    getIndexByName(catName) {
        return catName.split('_')[1];
    }
}

const controller = new Controller();
controller.render();
