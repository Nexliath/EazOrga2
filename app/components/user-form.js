import { get, computed } from "@ember/object";
import Component from "@ember/component";

export default Component.extend({
    tagName: "li",
    classNames: ["user-form"],
    placeholder: computed("index", function () {
        const index = get(this, "index");

        return index === 0 ? "Votre nom" : "Le nom de votre ami(e)";
    }),

    actions: {
        delete(user) {
            this.onDelete(user);
        },
    },
});
