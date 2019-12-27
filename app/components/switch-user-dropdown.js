import { get, computed } from "@ember/object";
import Component from "@ember/component";

export default Component.extend({
    tagName: "div",
    classNames: ["dropdown", "user-dropdown"],

    otherUsers: computed("selected", "users", function () {
        const users = get(this, "users");
        const currentUser = get(this, "selected");

        return users.rejectBy("id", get(currentUser, "id"));
    })
});
