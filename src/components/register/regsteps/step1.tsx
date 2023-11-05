import { FormControl, InputLabel, Select, MenuItem, TextField, FormHelperText, Button, Box } from "@mui/material";
import { useState } from "react"
import { Country, State } from 'country-state-city';
import { useFormik } from 'formik';
import * as yup from 'yup';
import SendIcon from '@mui/icons-material/SendTwoTone';


const validationSchema = yup.object({
    country_of_residence: yup
        .string()
        .required('Please select your Country of Residence'),
    state: yup
        .string()
        .required('State is Required'),
    occupation: yup
        .string()
        .required("Please enter your Occupation"),
    nationality: yup
        .string()
        .required("Please Select Your Nationalty")
})

export default function RegStepOne({ moveFront, moveBack, index }: any) {
    let chosen_country = ''
    let chosen_state = ''
    const [country_code, setCountryCode] = useState('')
    const [disabledState, setDisabledState] = useState(true)

    const formIk = useFormik({
        initialValues: {
            country_of_residence: '',
            state: '',
            occupation: '',
            nationality: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            localStorage.setItem("stepOne", JSON.stringify(values))
        }
    })

    function doSetCountry(event: any) {
        chosen_country = event.target.value;
        formIk.handleChange(event);
        getCountryCode();
        if (chosen_country) {
            doSetDisabledState()
        }
    }

    function getCountryCode() {
        Country.getAllCountries().map((res) => {
            if (res.name === chosen_country) {
                setCountryCode(res.isoCode)
                localStorage.setItem("chosen_country_code", res.isoCode)
            }
        })
    }

    function doSetDisabledState() {
        setDisabledState(false)
    }
    function chooseStateCode() {
        State.getAllStates().map((res) => {
            if (res.name === chosen_state) {
                localStorage.setItem("chosen_state_code", res.isoCode)
            }
        })
    }


    function doSetState(event: any) {
        chosen_state = event.target.value;
        formIk.handleChange(event)
        chooseStateCode();
    }

    function doSaveFrom() {
        formIk.submitForm()
    }

    return <>
        <div className="w-full px-2">
            <p className="text-gray-600 font-semibold mt-5 text-sm">General Info :</p>

            <div className="text-gray-600 mt-2 text-xs">We would first like to know</div>


            <form className="mt-5 w-full" onSubmit={formIk.handleSubmit}>
                <FormControl
                    sx={{ marginTop: 1, minWidth: 120 }}
                    className="w-full"
                >
                    <Select
                        onChange={doSetCountry}
                        name="country_of_residence"
                        onBlur={formIk.handleBlur}
                        label="Country of Residence *"
                        value={formIk.values.country_of_residence}
                        error={formIk.touched.country_of_residence && Boolean(formIk.errors.country_of_residence)}
                    >
                        {
                            Country.getAllCountries().map((res, index) => {
                                return <MenuItem key={index} value={res.name}>{res.name}</MenuItem>
                            })
                        }
                    </Select>
                    <InputLabel>Country of Residence *</InputLabel>

                    <FormHelperText>
                        {formIk.touched.country_of_residence && formIk.errors.country_of_residence}
                    </FormHelperText>
                </FormControl>

                <FormControl sx={{ marginTop: 5, minWidth: 120 }} className="w-full">
                    <InputLabel>State</InputLabel>
                    <Select
                        onChange={doSetState}
                        disabled={disabledState}
                        name="state"
                        label="State *"
                        value={formIk.values.state}
                        onBlur={formIk.handleBlur}
                        error={formIk.touched.state && Boolean(formIk.errors.state)}


                    >
                        {
                            State.getStatesOfCountry(country_code).map((res, index) => {
                                return <MenuItem key={index} value={res.name}>{res.name}</MenuItem>
                            })
                        }
                    </Select>

                    <InputLabel>State *</InputLabel>

                    <FormHelperText>
                        {formIk.touched.state && formIk.errors.state}
                    </FormHelperText>
                </FormControl>



                <FormControl sx={{ marginTop: 5, minWidth: 120 }} className="w-full">
                    <TextField
                        id="outlined-basic"
                        label="Occupation *"
                        variant="outlined"
                        type="text"
                        name="occupation"
                        value={formIk.values.occupation}
                        onChange={formIk.handleChange}
                        onBlur={formIk.handleBlur}
                        error={formIk.touched.occupation && Boolean(formIk.errors.occupation)}
                        helperText={formIk.touched.occupation && formIk.errors.occupation}


                    />
                </FormControl>


                <FormControl sx={{ marginTop: 5, minWidth: 120 }} className="w-full">
                    <InputLabel> Nationality *</InputLabel>
                    <Select
                        label="Nationality *"
                        name="nationality"
                        value={formIk.values.nationality}
                        onChange={formIk.handleChange}
                        onBlur={formIk.handleBlur}
                        error={formIk.touched.nationality && Boolean(formIk.errors.nationality)}
                    >
                        {
                            Country.getAllCountries().map((res, index) => {
                                return <MenuItem key={index} value={res.name}>{res.name}</MenuItem>
                            })
                        }

                    </Select>
                    <FormHelperText>
                        {formIk.touched.nationality && formIk.errors.nationality}
                    </FormHelperText>
                </FormControl>

                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 4 }}>
                    <Button
                        color="inherit"
                        disabled={index === 0}
                        onClick={moveBack}
                        sx={{ mr: 1 }}
                        variant="outlined"
                    >
                        Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button
                        onClick={() => {
                            doSaveFrom()
                            moveFront()
                        }}
                        variant="contained"
                        endIcon={<SendIcon />}
                        disabled={formIk.dirty ? !formIk.isValid : true}
                    >
                        Next
                    </Button>
                </Box>
            </form>
        </div>
    </>
}