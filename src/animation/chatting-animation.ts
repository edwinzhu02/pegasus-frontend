import { trigger, state, style, transition, animate } from '@angular/animations';

export const Animations = {
    unReadMessage: trigger('unReadTrigger', [
        state('on', style({
            color: 'orange',
        })),
        state('off', style({
            color: 'white',
        })),
    ]),

    changeThemeImg: trigger('themeImgTrigger', [
        state('theme0', style({
            "background-image": "url('../assets/images/shared/background01.jpg')",
        })),
        state('theme1', style({
            "background-image": "url('../assets/images/shared/background03.jpg')",
        })),
        state('theme2', style({
            "background-image": "url('../assets/images/shared/background04.jpg')",
        })),
        state('theme3', style({
            "background-image": "url('../assets/images/shared/background05.jpg')",
        })),
        state('theme4', style({
            "background-image": "url('../assets/images/shared/background06.jpg')",
        })),
    ]),

    changeThemeColor: trigger('themeColorTrigger', [
        state('theme0', style({
            background: '#fadbe3'
        })),
        state('theme1', style({
            background: '#a6ddd3'
        })),
        state('theme2', style({
            background: '#2a2a2a'
        })),
        state('theme3', style({
            background: '#a2bcb9'
        })),
        state('theme4', style({
            background: '#add8e6'
        }))
    ]),

    /*
        change online status animation 
    */
    changeOnlineStatus: trigger('onlineStatusTrigger', [
        state('online', style({
            background: 'rgb(125, 194, 22)'
        })),
        state('offline', style({
            background: 'rgb(175, 56, 56)'
        }))
    ]),

    /*
        display/hide personal profile panel animation 
    */
    personalPanelAnimation: trigger('displayPersonalPanelTrigger', [
        state('display', style({
            display: 'block'
        })),
        state('hide', style({
            display: 'none'
        }))
    ]),

    /*
        switch group chat and subscriber
    */
    switchGroupAnimation: trigger('switchGroupTrigger', [
        state('display', style({
            display: 'block'
        })),
        state('hide', style({
            display: 'none'
        }))
    ]),

    emojiPickerPanelDisplayAnimation: trigger('displayPickerPanelTrigger',[
        state('display', style({
            display: 'block'
        })),
        state('hide', style({
            display: 'none'
        }))
    ])
}
