import React from 'react'
import { useTranslation } from 'react-i18next'
import { Typography, Box } from '@mui/material'

export default function FeedbackContent(props) {
    if (process.env.REACT_APP_DEBUG === 'TRUE') {
        //console.log("FeedbackContent");
    }
    // i18n
    const { t } = useTranslation()

    /*
    
    Supported content type 
        * typography
            - variant : string
            - gutterbottom : boolean
            - sx : dict
            - text : string
     
     */

    switch (props.content.type) {
        case 'typography':
            return (
                <Box>
                    <Typography
                        variant={props.content.variant || 'body1'}
                        gutterBottom={props.content.gutterbottom || false}
                        sx={props.content.sx || {}}
                        data-testid="component-feedback content#text-feedback content"
                    >
                        {t(props.content.text)}
                    </Typography>
                </Box>
            )
            break
        default:
            return null
    }
}
