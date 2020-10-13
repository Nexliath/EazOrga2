import { notEmpty } from "@ember/object/computed";
import { get, computed } from "@ember/object";
import Component from "@ember/component";

export default Component.extend({
    tagName: "div",
    classNames: ["dropdown", "event-dropdown"],

    otherEvents: computed("events", "selected", function () {
        const events = get(this, "events");
        const selected = get(this, "selected");

        return events.rejectBy("id", selected.get("id"));
    }),

    anyOtherEvents: notEmpty("otherEvents"),
});
