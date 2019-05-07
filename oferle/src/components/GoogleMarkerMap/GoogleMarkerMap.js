import React from "react";
import { compose, withProps } from "recompose";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from "react-google-maps";

const markerImageUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAoCAYAAAACJPERAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjlERTAzMjYzMTRDOTExRTlCODU2RTBCRjIzMUYwREY2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjlERTAzMjY0MTRDOTExRTlCODU2RTBCRjIzMUYwREY2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OURFMDMyNjExNEM5MTFFOUI4NTZFMEJGMjMxRjBERjYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OURFMDMyNjIxNEM5MTFFOUI4NTZFMEJGMjMxRjBERjYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7FJjRdAAADWklEQVR42rSYW0iUQRTHz367arTeNc3d0K5GFJVBL4EPFdmN6GZGZr5EaYIWPVRCDwr2UkT1UD5FUlpPQTeTHrKLRTeisqBcI8y02kRZ75fddfufj1lYZL+bu3vgx87OnJn/NzM75zuzpkzHW9Jpc8E6sAJkgwTgAy7QBj6BZvBLayCLDrHNoAJsBCYFny3i0wOawAXwRGlASUXMDm6Dh2CTiuDUSWwTM24AqUZE88BnsIumb4VijFw9oiz0CCRR6DYbPBeTUBRdLZY03MaTWBJMNBo8oMhZUzDRiyAtgqJZoCZQNBMc0du7LCmDPs7PodYFOXKZLcUcRQXxqRRlUv2RV/LE/Oe0Qo8YP2F1WhYVJ6RRj9cth4aTqXMoIyqa+r0eKk+2kdPjpmcj/WpDlLAoP2q+5gHEDM6nz6MdcSnUPjFK+7vb5Pqb9sXyQwxNeuXvZpPmcd7LyuvFeitajEmi2oyFsmDr2DDt6fpGq2bEUg7IR5nrYiWz3t1ZyqLL1TyskkR1tkWUZ02kN6ODtA8z3BqbTFfwEPwgXOY6bmM7lJgu99HaJrtSY6LZQg1YvjUz46l52EXF3Q46gKWswb5KojOXi1DHbezDvtwnQbKoilqVGm/YsuUlvD/YR4f/fKejKTY6hR9O4K5xuRJ13MY+7Mt96u3ZqgHardT4dWKEXmHZzvZ2UfWsTHlGascoDvt6zPmDuj3jlGS2qIr2KjWecHbIn1Uagn7jpff4fFTV06m5pw6twZbFWHWHHT2+LPoCjBmJZ/X9/yi3o1WGywbNxaLvwGMjvQYQCDrd4zIDIigYCfySyHMuq3m5fZO6R9ThWysFvHbalLyuupzU63VrCrIP+6oYr2qLKSAb3A7uUGRtLXgaGK/ugi8RFHzNgsHSldIIipYq5Ugvwb0ICF4XybhiNlgCJsMoOArKtVLQv+B4GEXL+GjrSbYvgfdhEOSrRZ2Ra0VhiIIcdIqM3mUcIS7zQfDbqCiJ21fLNAQbwbXp3Nr8thMMGxDsAwVarzbNkMppowHR3WAkVFH/cp3T4XfaH+rCISpnL+KFr3YzO6P3pmDE+K+AniD1P8UNnCIhOiT+e5h6HjeoZZWhirJ9mBI4eIbtRgawTPPg3wIrRTBvNNr5vwADAJEn6f9THNZPAAAAAElFTkSuQmCC"

const MyMapComponent = compose(
    withProps({
        googleMapURL:
            "https://maps.googleapis.com/maps/api/js?key=AIzaSyAZuL8k6-kXPlRm5MZ6i-aoUGfuCMtGbVg",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `100%` }} />,
        mapElement: <div style={{ height: `100%` }} />
    }),
    withScriptjs,
    withGoogleMap
)(props => (
    <GoogleMap defaultZoom={8} defaultCenter={{ lat: 27.6648 , lng: -81.5158 }}>
        {console.log('props from GoogleMarkerMap <<^^^^>>', props.markerCoordinates)} 
        {props.markerCoordinates.map((data, index) => {return(<Marker position={{ lat: data.lat, lng: data.lng }} icon={{ url: markerImageUrl}}  key= {index}/>)} )}
        {/* <Marker position={{ lat: 25.761681, lng: -80.191788 }} icon={{ url: markerImageUrl}} />
        <Marker position={{ lat: 28.538336, lng: -81.379234 }}  icon={{ url: markerImageUrl}} />
        <Marker position={{ lat: 27.964157, lng: -82.452606 }}  icon={{ url: markerImageUrl}} /> */}
    </GoogleMap>
));

export default class GoogleMarkerMap extends React.Component {

    render() {
        console.log('props from property listing ===>', this.props.propertyCoordinates)
        return (

            <MyMapComponent key="map" markerCoordinates = {this.props.propertyCoordinates}/>
        )
    }
}
