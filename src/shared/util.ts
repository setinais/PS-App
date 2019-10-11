import {Visibility} from "tns-core-modules/ui/enums";


import {isAndroid, isIOS} from "tns-core-modules/platform";
import {Color} from "tns-core-modules/color";
import * as frame from 'tns-core-modules/ui/frame';
import * as application from 'tns-core-modules/application';


// Mascara Telefone
export const maskPhone = (phone: string, mask: string) => {
    let number: any = phone.replace(/\D/g, '') || ''
    let pad = mask.replace(/\D/g, '').replace(/9/g, '_')

    if(number.length === pad.length){
        pad = pad.replace(/0/g, '_')
    } else {
        pad = pad.replace(/0/g, '')
        mask = mask.replace(/0/g, '')
    }

    let valorMask = number + pad.substring(0, pad.length - number.length)


    let numberMaskpos = 0
    number = ''

    for (let i = 0; i < mask.length; i++) {
        if (isNaN(parseInt(mask.charAt(i)))) {
            number += mask.charAt(i)
        } else {
            number += valorMask[numberMaskpos++]
        }
    }
    if (number.indexOf('_') > -1) {
        number = number.substr('', number.indexOf('_'))
    }

    return number
}


declare var android, UIApplication, UIView, CGRectMake, CGPointMake,
    UIActivityIndicatorView, UIActivityIndicatorViewStyle;

let loaderView;

export function showLoader(message: string = 'Carregando...') {
    if (loaderView) {
        return;
    }

    if (isIOS) {
       // utils.ios.getter(UIApplication, UIApplication.sharedApplication).beginIgnoringInteractionEvents();

        const currentView = frame.topmost().ios.controller.view;
        loaderView = UIView.alloc().initWithFrame(CGRectMake(0, 0, 90, 90));
        loaderView.center = currentView.center;
        loaderView.layer.cornerRadius = 4;
        loaderView.backgroundColor = new Color("#CC000000").ios;

        const indicator = UIActivityIndicatorView.alloc().initWithActivityIndicatorStyle(UIActivityIndicatorViewStyle.WhiteLarge);
        indicator.center = CGPointMake(45, 45);

        loaderView.addSubview(indicator);
        currentView.addSubview(loaderView);

        indicator.startAnimating();
    }

    if (isAndroid) {
        loaderView = android.app.ProgressDialog.show(application.android.foregroundActivity, '', message);
    }
}

export function hideLoader() {
    if (!loaderView) {
        return;
    }

    if (isIOS) {
        loaderView.removeFromSuperview();
        //utils.ios.getter(UIApplication, UIApplication.sharedApplication).endIgnoringInteractionEvents();
    }

    if (isAndroid) {
        loaderView.dismiss();
    }

    loaderView = null;
}
