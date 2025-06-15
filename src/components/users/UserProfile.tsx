import { useState, type PropsWithChildren } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './UserProfile.module.css';
import type { User } from '../../models';
import Button from 'antd/es/button';
import { systemMessages } from '../../utils/utils';
import UserProfileView from './UserProfileView';
import { useUpdateUserByIdMutation } from '../../api/apiSlice';

const validationSchema = Yup.object({
    name: Yup.string().max(50, systemMessages.MAX_LENGTH),
    username: Yup.string().required('Username is required').max(50, systemMessages.MAX_LENGTH),
    email: Yup.string().email('Invalid email').required('Email is required').max(50, systemMessages.MAX_LENGTH),
    address: Yup.object({
        street: Yup.string().required('Street is required').max(100, systemMessages.MAX_LENGTH),
        suite: Yup.string().required('Suite is required').max(100, systemMessages.MAX_LENGTH),
        city: Yup.string().required('City is required').max(100, systemMessages.MAX_LENGTH),
        zipcode: Yup.string().max(10, systemMessages.MAX_LENGTH),
        geo: Yup.object({
            lat: Yup.string().max(10, systemMessages.MAX_LENGTH),
            lng: Yup.string().max(10, systemMessages.MAX_LENGTH),
        }),
    }),
    phone: Yup.string().max(30, systemMessages.MAX_LENGTH),
    website: Yup.string().max(100, systemMessages.MAX_LENGTH),
    company: Yup.object({
        name: Yup.string().max(100, systemMessages.MAX_LENGTH),
        catchPhrase: Yup.string().max(100, systemMessages.MAX_LENGTH),
        bs: Yup.string().max(100, systemMessages.MAX_LENGTH),
    }),
});

const inputFieldsList = [
    { name: 'name', label: 'Name' },
    { name: 'username', label: 'Username' },
    { name: 'email', label: 'Email' },
    { name: 'phone', label: 'Phone' },
    { name: 'website', label: 'Website' },
    { name: 'address.street', label: 'Street' },
    { name: 'address.suite', label: 'Suite' },
    { name: 'address.city', label: 'City' },
    { name: 'address.zipcode', label: 'Zipcode' },
    { name: 'address.geo.lat', label: 'Geo Latitude' },
    { name: 'address.geo.lng', label: 'Geo Longitude' },
    { name: 'company.name', label: 'Company Name' },
    { name: 'company.catchPhrase', label: 'Catch Phrase' },
    { name: 'company.bs', label: 'Business Slogan' }
];

const UserProfile = ({ user, children }: PropsWithChildren<{ user: User }>) => {
    const [isEditing, setIsEditing] = useState(false);
    const [userDataSnapshot, setUserDataSnapshot] = useState(user);
    const [updateUserById] = useUpdateUserByIdMutation();

    const handleSubmit = (values: User) => {
        updateUserById({ id: values.id, user: values });
        setIsEditing(false);
    };

    const handleEdit = () => {
        setUserDataSnapshot(user);
        setIsEditing(true);
    }

    return (
        <div className={styles.card}>
            {!isEditing ? (
                <>
                    <UserProfileView user={user}>
                        <div className={`${styles.section} ${styles.buttonsGroup}`}>
                            <Button type='primary' onClick={handleEdit} data-testid="edit-profile-button">
                                Edit profile
                            </Button>
                            {children}
                        </div>
                    </UserProfileView>
                </>
            ) : (
                <Formik
                    initialValues={user}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({ resetForm }) => (
                        <Form className={styles.form}>
                            <h2 data-testid="edit-profile-title">Edit profile</h2>

                            {inputFieldsList.map(field => <article key={field.name} className={styles.formField}>
                                <label htmlFor={field.name}>{field.label}</label>
                                <Field name={field.name} />
                                <ErrorMessage name={field.name} component="div" className={styles.error} />
                            </article>)}

                            <div className={styles.actions}>
                                <Button htmlType="submit" name='submit' data-testid='save-button'>Save</Button>
                                <Button
                                    onClick={() => resetForm({ values: userDataSnapshot })}
                                    data-testid='revert-button'>Revert</Button>
                                <Button
                                    onClick={() => setIsEditing(false)}
                                    data-testid='cancel-button'
                                >
                                    Cancel
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            )}
        </div>
    );
};

export default UserProfile;
