import express from 'express';
import { createClient } from '@supabase/supabase-js';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

app.post('/sign-in', async (req, res) => {
    const { email, password, username } = req.body;

    console.log(req.body)
    
    if (!email) return res.status(400).json({ error: 'No Email.' });
    if (!password) return res.status(400).json({ error: 'No Password.' });
    if (!username) return res.status(400).json({ error: 'No Username.' });

    const { data, error } = await supabase
        .from('users')
        .insert([[{ email, password, username }]]);
    
    if (error) return res.status(500).json({ error: error.message });

    res.status(201).json({ success: true, data });
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
