import Link from 'next/link';


const PageHeading = ({ title, subtitle, manageButton = {text: '', link: ''} }) => {
    return (
        <>
            {/* Component content */}
            <h1>{title}</h1>
            <div className="d-flex justify-content-between align-items-center my-4">
                <p className="text-muted">{subtitle}</p>
                {(manageButton.text !== '' && manageButton.link !== '') && (
                    <Link href={manageButton.link} className="btn btn-primary rounded-pill">{manageButton.text}</Link>
                )}
            </div>
            
        </>
    );
};

export default PageHeading;