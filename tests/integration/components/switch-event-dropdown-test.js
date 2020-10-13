import EmberObject from "@ember/object";
import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import extraTrim from "../../helpers/extra-trim";

moduleForComponent("switch-event-dropdown", "Integration | Component | switch event dropdown", {
    integration: true,
});

test("it renders", function (assert) {
    const events = [
        EmberObject.create({ id: 1, name: "Test event 1" }),
        EmberObject.create({ id: 2, name: "Second event" }),
    ];

    this.set("events", events);
    this.set("selected", events[0]);

    this.render(hbs`{{switch-event-dropdown selected=selected events=events}}`);

    assert.equal(extraTrim(this.$().text()), "Test event 1 Switch to Second event Add New Event");
});
