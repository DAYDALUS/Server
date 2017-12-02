'use strict'

var attachment = {};

attachment.user_not_found = {
    attachments: [
        {
            fallback: "Please register before trying to log in",
            color: "danger",
            title: "Register Here",
            title_link: "http://slack.txtportal.site",
            text: "User does not exist in database.\n Use link to register.",
            footer: "Duck API",
            footer_icon: "https://slack-files2.s3-us-west-2.amazonaws.com/avatars/2017-11-13/271954998949_0d651a6f1f8bec9ae247_96.png",
        }
    ]
}

attachment.user_already_signed_in = {
    attachments: [
        {
            fallback: "Opps! You are already signed in.",
            color: "danger",
            title: "Opps!",
            text: "You are already signed in.",
            footer: "Duck API",
            footer_icon: "https://slack-files2.s3-us-west-2.amazonaws.com/avatars/2017-11-13/271954998949_0d651a6f1f8bec9ae247_96.png",
        }
    ]
}

attachment.user_sign_out_time = {

    "text": "When are you leaving the Cube?",
    "response_type": "in_channel",
    "attachments": [
        {
            "text": "Choose One",
            "fallback": "If you could read this message, you'd be choosing when you are leaving the Cube, Report to Rob.",
            "color": "#3AA3E3",
            "attachment_type": "default",
            "callback_id": "game_selection",
            "actions": [
                {
                    "name": "times_list",
                    "text": "Pick a time...",
                    "type": "select",
                    "options": [
                        {
                            "text": "In 1 hr",
                            "value": "1"
                        },
                        {
                            "text": "In 2 hrs",
                            "value": "2"
                        },
                        {
                            "text": "In 3 hrs",
                            "value": "3"
                        },
                        {
                            "text": "In 4 hrs",
                            "value": "4"
                        },
                        {
                            "text": "In 5 hrs",
                            "value": "5"
                        },
                        {
                            "text": "In 6 hrs",
                            "value": "6"
                        }
                    ]
                }
            ]
        }
    ]

}

attachment.successful_login = {
    attachments: [
        {
            fallback: "You were succesfully signed in. I will take care of signing you out later :)",
            color: "good",
            title: "Success!",
            text: "You were succesfully signed in.\n I will take care of signing you out later :)",
            footer: "Duck API",
            footer_icon: "https://slack-files2.s3-us-west-2.amazonaws.com/avatars/2017-11-13/271954998949_0d651a6f1f8bec9ae247_96.png",
        }
    ]
}
attachment.channel_error = {
    attachments: [
        {
            fallback: "Cannot Use this command in this channel.",
            color: "danger",
            title: "Opps!",
            text: "You cannot use this command in this channel.\n Please use the correct channel",
            footer: "Duck API",
            footer_icon: "https://slack-files2.s3-us-west-2.amazonaws.com/avatars/2017-11-13/271954998949_0d651a6f1f8bec9ae247_96.png",
        }
    ]
}

module.exports = attachment;