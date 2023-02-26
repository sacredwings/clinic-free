import { renderToStaticMarkup } from 'react-dom/server'
import pdf from 'html-pdf'

const componentToPDFBuffer = ({component, orientation='portrait'}) => {
    return new Promise((resolve, reject) => {
        let html = renderToStaticMarkup(component)

        const options = {
            format: 'A4',
            orientation: orientation,
            border: '8mm',
            footer: {
                height: '8mm',
            },
            type: 'pdf',
            timeout: 30000,
        }

        const buffer = pdf.create(html, options).toBuffer((err, buffer) => {
            if (err) {
                return reject(err)
            }

            return resolve(buffer)
        });
    });
}

export {
    componentToPDFBuffer
}